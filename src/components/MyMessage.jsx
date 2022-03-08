const MyMessage = ({ message }) => {
  let doc = new DOMParser().parseFromString(message.text, "text/xml");
  if (message?.attachments?.length > 0) {
    return (
      <img
        src={message.attachments[0].file}
        alt="message-attachment"
        className="message-image"
        style={{ float: "right" }}
      />
    );
  }
  return (
    <div
      className="message"
      style={{
        float: "right",
        marginRight: "18px",
        color: "white",
        backgroundColor: "#3b2a50",
      }}
    >
      {message.text !== "" && doc.firstChild.innerHTML}
    </div>
  );
};
export default MyMessage;
