// Clique no ícone da extensão: liga ou desliga o modo Planalto (a preferência vale para todas as abas).
chrome.action.onClicked.addListener(async () => {
  const { tecf = true } = await chrome.storage.local.get("tecf");
  await chrome.storage.local.set({ tecf: !tecf });
});
