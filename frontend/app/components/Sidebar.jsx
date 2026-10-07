/**
 * Sidebar Components
 *
 * This file demonstrates React component organization and modularity:
 * 1. Multiple related components in one file
 * 2. Import/export patterns for sharing components
 * 3. Component composition and hierarchy
 * 4. File organization for better project structure
 */

/**
 * SidebarHeader Component
 *
 * Handles the top section of the sidebar with title and new chat button.
 * This component demonstrates single responsibility and reusability.
 */
function SidebarHeader() {
  return (
    <div className="sidebar-header">
      <h2 className="chatbot-title">Chatbot</h2>
      <a href="/chat/new" className="new-chat-btn">
        + New
      </a>
    </div>
  );
}

/**
 * ChatThreadItem Component
 *
 * Renders one thread using values passed in through props. It also receives a
 * callback so the parent can update its thread list when Delete is clicked.
 */
function ChatThreadItem(props) {
  function handleDeleteClick(event) {
    // Keep the click from bubbling to any future parent click handlers.
    event.stopPropagation();
    // The item does not own the list, so it asks its parent to delete by ID.
    props.onDeleteThread(props.id);
  }

  return (
    <li className="chat-thread-item">
      <div className="chat-thread-item-content">
        <a href={props.href} className="chat-thread-link">
          {props.title}
        </a>
        {/* type=button avoids form submission; aria-label names the × for screen readers. */}
        <button
          className="delete-thread-button"
          type="button"
          aria-label={`Delete ${props.title}`}
          onClick={handleDeleteClick}
        >
          &times;
        </button>
      </div>
    </li>
  );
}

/**
 * ChatThreadsList Component
 *
 * Receives the list and callback from Sidebar, then passes each thread's data
 * and the callback to a ChatThreadItem.
 */
function ChatThreadsList(props) {
  // Pass deleteThread along under the event-handler name onDeleteThread.
  return (
    <nav className="chat-threads-list" aria-label="Chat threads">
      <ul>
        {/* Map the list to one item per thread; the stable ID is each key. */}
        {props.threads.map((thread) => (
          <ChatThreadItem
            key={thread.id}
            id={thread.id}
            href={thread.href}
            title={thread.title}
            onDeleteThread={props.deleteThread}
          />
        ))}
      </ul>
    </nav>
  );
}

/**
 * SidebarFooter Component
 *
 * Handles the user profile section at the bottom of the sidebar.
 * Demonstrates component modularity and independence.
 */
function SidebarFooter() {
  return (
    <div className="sidebar-footer">
      <a href="/profile" className="user-profile">
        <img
          src="https://ui-avatars.com/api/?name=Batman&background=0D0D0D&color=fff&size=40"
          alt="User avatar"
          className="user-avatar"
          width={30}
          height={30}
        />
        <span className="user-name">Batman</span>
      </a>
    </div>
  );
}

/**
 * Main Sidebar Component
 *
 * Combines the header, thread list, and footer. It owns none of the thread
 * state; it passes Layout's props down to the list.
 */
export default function Sidebar(props) {
  return (
    <aside className="sidebar">
      {/* Component composition with prop drilling */}
      <SidebarHeader />
      {/* Sidebar passes the props it received down to the list component. */}
      <ChatThreadsList
        threads={props.threads}
        deleteThread={props.deleteThread}
      />
      <SidebarFooter />
    </aside>
  );
}
