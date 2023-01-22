export const highlightText = (text: string, keyword: string) => {
  const idx = text.toLowerCase().indexOf(keyword);
  if (idx >= 0 && keyword !== '') {
    const len = keyword.length;
    text = text.replace(
      text.substring(idx, idx + len),
      '<span>' + text.substring(idx, idx + len) + '</span>'
    );
  }
  return text;
};
