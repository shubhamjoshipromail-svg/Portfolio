const sections = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav a");
const progressBar = document.querySelector(".scroll-progress-bar");
const countUps = document.querySelectorAll("[data-countup]");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleLabel = document.querySelector(".theme-toggle-label");
const copyEmailButton = document.querySelector(".copy-email");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const themeStorageKey = "portfolio-theme";

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

if (prefersReducedMotion) {
  sections.forEach((section) => section.classList.add("is-visible"));
} else {
  sections.forEach((section) => revealObserver.observe(section));
}

const setScrollProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      if (!id) {
        return;
      }

      const link = document.querySelector(`.nav a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach((navLink) => navLink.classList.remove("is-current"));
        link?.classList.add("is-current");
      }
    });
  },
  {
    threshold: 0.45,
  }
);

document.querySelectorAll("main section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

const animateCount = (element) => {
  const target = Number(element.dataset.countup || "0");
  const suffix = element.textContent.includes("+") ? "+" : "";
  let frame = 0;
  const totalFrames = 36;

  const tick = () => {
    frame += 1;
    const value = Math.round((target * frame) / totalFrames);
    element.textContent = `${value}${suffix}`;
    if (frame < totalFrames) {
      requestAnimationFrame(tick);
    }
  };

  tick();
};

if (!prefersReducedMotion) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.8,
    }
  );

  countUps.forEach((counter) => counterObserver.observe(counter));
}

const setTheme = (theme) => {
  const isNight = theme === "night";
  document.body.classList.toggle("theme-night", isNight);
  themeToggle?.setAttribute("aria-pressed", String(isNight));

  if (themeToggleLabel) {
    themeToggleLabel.textContent = isNight ? "Night Mode" : "Warm Mode";
  }

  window.localStorage.setItem(themeStorageKey, theme);
};

const savedTheme = window.localStorage.getItem(themeStorageKey);
if (savedTheme === "night" || savedTheme === "warm") {
  setTheme(savedTheme);
}

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("theme-night")
    ? "warm"
    : "night";
  setTheme(nextTheme);
});

copyEmailButton?.addEventListener("click", async () => {
  const email = copyEmailButton.dataset.copy || "";
  const originalLabel = copyEmailButton.textContent;

  try {
    await navigator.clipboard.writeText(email);
    copyEmailButton.textContent = "Copied";
  } catch {
    copyEmailButton.textContent = email;
  }

  window.setTimeout(() => {
    copyEmailButton.textContent = originalLabel;
  }, 1600);
});

window.addEventListener("scroll", setScrollProgress, { passive: true });
setScrollProgress();

const chatToggle = document.querySelector(".portfolio-chat-toggle");
const chatPanel = document.querySelector(".portfolio-chat-panel");
const chatCloseButton = document.querySelector(".portfolio-chat-close");
const chatTranscript = document.querySelector(".portfolio-chat-transcript");
const chatSuggestions = document.querySelector(".portfolio-chat-suggestions");
const chatSuggestionButtons = document.querySelectorAll(".portfolio-chat-suggestion");
const chatForm = document.querySelector(".portfolio-chat-form");
const chatInput = document.querySelector(".portfolio-chat-input");
const chatSubmit = document.querySelector(".portfolio-chat-submit");

const sourceLabels = {
  home: "View intro",
  work: "View work",
  "home-credit-case-study": "View Home Credit",
  "cms-case-study": "View ACHP / CMS",
  "fridgechef-case-study": "View FridgeChef",
  "rxcheck-case-study": "View RxCheck",
  about: "View about",
  skills: "View skills",
  contact: "View contact",
};

let chatRequestInFlight = false;

const scrollChatToBottom = () => {
  if (chatTranscript) {
    chatTranscript.scrollTop = chatTranscript.scrollHeight;
  }
};

const updateSuggestionVisibility = () => {
  if (!chatSuggestions) {
    return;
  }

  chatSuggestions.hidden = Boolean(chatTranscript?.children.length);
};

const setChatOpen = (isOpen) => {
  if (!chatToggle || !chatPanel) {
    return;
  }

  chatPanel.hidden = !isOpen;
  chatToggle.setAttribute("aria-expanded", String(isOpen));

  if (isOpen && !chatRequestInFlight) {
    window.setTimeout(() => chatInput?.focus(), 0);
  }
};

const createTypingIndicator = () => {
  const typing = document.createElement("span");
  typing.className = "portfolio-chat-typing";
  typing.setAttribute("aria-hidden", "true");

  for (let index = 0; index < 3; index += 1) {
    typing.append(document.createElement("span"));
  }

  return typing;
};

const createMessage = (role, text = "") => {
  const message = document.createElement("article");
  message.className = "portfolio-chat-message";
  message.dataset.role = role;

  const bubble = document.createElement("div");
  bubble.className = "portfolio-chat-bubble";

  if (role === "assistant" && !text) {
    bubble.append(createTypingIndicator());
  } else {
    bubble.textContent = text;
  }

  message.append(bubble);
  chatTranscript?.append(message);
  updateSuggestionVisibility();
  scrollChatToBottom();

  return { message, bubble };
};

const replaceAssistantText = (bubble, text) => {
  bubble.textContent = text;
  scrollChatToBottom();
};

const appendAssistantText = (bubble, chunk) => {
  const currentText = bubble.textContent || "";
  bubble.textContent = `${currentText}${chunk}`;
  scrollChatToBottom();
};

const flashSection = (sectionId) => {
  const target = document.getElementById(sectionId);
  if (!target) {
    return;
  }

  target.classList.remove("section-flash");
  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });

  window.requestAnimationFrame(() => {
    target.classList.add("section-flash");
    window.setTimeout(() => target.classList.remove("section-flash"), 1500);
  });
};

const renderSources = (message, sources) => {
  if (!sources?.length) {
    return;
  }

  const sourceWrap = document.createElement("div");
  sourceWrap.className = "portfolio-chat-sources";

  sources.forEach((source) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "portfolio-chat-source";
    button.textContent = sourceLabels[source] || `View ${source}`;
    button.addEventListener("click", () => {
      setChatOpen(false);
      flashSection(source);
    });
    sourceWrap.append(button);
  });

  message.append(sourceWrap);
};

const setChatBusy = (isBusy) => {
  chatRequestInFlight = isBusy;

  if (chatInput) {
    chatInput.disabled = isBusy;
  }

  if (chatSubmit) {
    chatSubmit.disabled = isBusy;
  }
};

const parseSseChunk = (rawEvent, assistantMessage) => {
  const dataLines = rawEvent
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data: "))
    .map((line) => line.slice(6));

  if (!dataLines.length) {
    return { done: false };
  }

  const payload = JSON.parse(dataLines.join("\n"));
  const bubble = assistantMessage.bubble;

  if (payload.type === "token") {
    if (bubble.querySelector(".portfolio-chat-typing")) {
      replaceAssistantText(bubble, payload.value || "");
    } else {
      appendAssistantText(bubble, payload.value || "");
    }
    return { done: false };
  }

  if (payload.type === "done") {
    renderSources(assistantMessage.message, payload.sources || []);
    if (!bubble.textContent?.trim()) {
      replaceAssistantText(
        bubble,
        "I don't have that detail in Shubham's portfolio materials. You can reach him directly at shubhamjoshipro.mail@gmail.com."
      );
    }
    return { done: true };
  }

  if (payload.type === "error") {
    replaceAssistantText(
      bubble,
      payload.message ||
        "Something went wrong. Please try again, or email Shubham directly."
    );
    return { done: true };
  }

  return { done: false };
};

const streamAssistantReply = async (question) => {
  const assistantMessage = createMessage("assistant");

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      replaceAssistantText(
        assistantMessage.bubble,
        payload.message ||
          "Something went wrong. Please try again, or email Shubham directly."
      );
      return;
    }

    if (!response.body) {
      replaceAssistantText(
        assistantMessage.bubble,
        "Something went wrong. Please try again, or email Shubham directly."
      );
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value || new Uint8Array(), { stream: !done });

      let boundaryIndex = buffer.indexOf("\n\n");
      while (boundaryIndex !== -1) {
        const rawEvent = buffer.slice(0, boundaryIndex).trim();
        buffer = buffer.slice(boundaryIndex + 2);

        if (rawEvent) {
          const eventState = parseSseChunk(rawEvent, assistantMessage);
          if (eventState.done) {
            streamDone = true;
            break;
          }
        }

        boundaryIndex = buffer.indexOf("\n\n");
      }

      if (done) {
        if (!streamDone && buffer.trim()) {
          parseSseChunk(buffer.trim(), assistantMessage);
        }
        break;
      }
    }
  } catch {
    replaceAssistantText(
      assistantMessage.bubble,
      "Something went wrong. Please try again, or email Shubham directly."
    );
  }
};

const submitChatQuestion = async (question) => {
  const trimmedQuestion = question.trim();
  if (!trimmedQuestion || chatRequestInFlight) {
    return;
  }

  createMessage("user", trimmedQuestion);
  if (chatInput) {
    chatInput.value = "";
  }

  setChatBusy(true);
  try {
    await streamAssistantReply(trimmedQuestion);
  } finally {
    setChatBusy(false);
    chatInput?.focus();
  }
};

chatToggle?.addEventListener("click", () => {
  setChatOpen(chatPanel?.hidden ?? true);
});

chatCloseButton?.addEventListener("click", () => {
  setChatOpen(false);
});

chatPanel?.addEventListener("click", (event) => {
  event.stopPropagation();
});

chatToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.addEventListener("click", (event) => {
  if (
    chatPanel &&
    chatToggle &&
    !chatPanel.hidden &&
    !chatPanel.contains(event.target) &&
    !chatToggle.contains(event.target)
  ) {
    setChatOpen(false);
  }
});

chatForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await submitChatQuestion(chatInput?.value || "");
});

chatSuggestionButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    setChatOpen(true);
    await submitChatQuestion(button.textContent || "");
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && chatPanel && !chatPanel.hidden) {
    setChatOpen(false);
  }
});

updateSuggestionVisibility();
