function formatVND(price) {
    return String(price).replace(/(.)(?=(\d{3})+$)/g, '$1.') + " VNĐ";
  }
  async function getData(url) {
    const res = await fetch(url);
    return res.json();
  }
  function truncate(text) {
    return text.slice(0, 50) + "...";
}