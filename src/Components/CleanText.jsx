const CleanText = ({ data }) => {
  return (
    <p>
      {data.description &&
        data.description
          .replaceAll("<br/>", " ")
          .replaceAll("<br />", " ")
          .replaceAll("<br>", "")
          .replaceAll("<h2>", "")
          .replaceAll("</h2>", ". ")
          .replaceAll("<h3>", "")
          .replaceAll("</h3>", ". ")
          .replaceAll("<p>", "")
          .replaceAll("</p>", " ")
          .replaceAll("&quot;", "'")
          .replaceAll("&#39;s", "")
          .replaceAll("<strong>", "")
          .replaceAll("</strong>", "")
          .replaceAll("<ul>", "")
          .replaceAll("</ul>", " ")
          .replaceAll("<li>", "")
          .replaceAll("</li>", " ")
          .replaceAll(":.", ": ")}
    </p>
  );
};
export default CleanText;
