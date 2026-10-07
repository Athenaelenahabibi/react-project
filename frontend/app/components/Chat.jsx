// Hooks such as useState must be imported before a component can use them.
import { useState } from "react";

/**
 * Chat Components
 *
 * This file contains all chat-related components for the messaging interface.
 * It demonstrates:
 * 1. LOGICAL GROUPING: Related components organized in the same file
 * 2. COMPONENT HIERARCHY: Message -> ChatMessages -> ChatInput
 * 3. EXPORT PATTERNS: Multiple named exports from a single file
 * 4. REUSABLE MODULES: Components that can be imported anywhere in the app
 */

/**
 * Message Component
 *
 * A reusable component for displaying individual chat messages.
 * Accepts a type to customize the message style and children for message content.
 * https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
 */
function Message({ type = "bot", children = null }) {
  // A template string lets the message type choose the CSS class.
  return (
    <div className={`message ${type}-message`}>
      <div className="message-content">{children}</div>
    </div>
  );
}

/**
 * ChatMessages Component
 *
 * Now this component receives data via PROPS! Key concepts:
 * 1. PROPS ACCEPTANCE: Component accepts a 'messages' prop from parent
 * 2. DATA FLOW: Data flows down from parent (Home) to child (ChatMessages)
 * 3. COMPONENT REUSABILITY: Can work with any messages array passed as props
 * 4. SEPARATION OF CONCERNS: Component focuses on rendering, parent manages data
 * 5. MAP() WITH PROPS: Uses the messages prop instead of internal data
 */
function ChatMessages({ messages = [] }) {
  return (
    <div className="chat-messages">
      {/* Messages data comes from the parent component. */}
      {/* map() makes one Message per object; each stable key helps React track list changes. */}
      {messages.map((message) => (
        <Message key={message.id} type={message.type}>
          {message.content}
        </Message>
      ))}
    </div>
  );
}

/**
 * ChatInput Component
 *
 * Form component that handles user input for sending messages.
 * Contains textarea and send button for message composition.
 */
function ChatInput() {
  // State belongs to this component because only the input needs this value.
  // The first array item is the current value; the second updates it.
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event) {
    // Browsers normally reload/navigate when a form is submitted.
    event.preventDefault();

    // Updating state tells React to render the submitting UI.
    setIsSubmitting(true);

    // Simulate waiting for a server; the callback runs after one second.
    setTimeout(() => setIsSubmitting(false), 1000);
  }

  // The form's onSubmit handles Enter and button clicks through one code path.
  return (
    <form className="chat-input-container" onSubmit={handleSubmit}>
      <div className="chat-input-wrapper">
        <textarea
          className="chat-input"
          placeholder="Type your message here..."
          rows="1"
        />
        {/* A submit button triggers the form's onSubmit handler. */}
        <button className="send-button" type="submit" disabled={isSubmitting}>
          {/* Conditional rendering changes the label while waiting. */}
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}

/**
 * Named Exports
 *
 * We export each component individually so they can be imported separately
 * if needed. This provides flexibility in how components are used.
 */
export { Message, ChatMessages, ChatInput };
