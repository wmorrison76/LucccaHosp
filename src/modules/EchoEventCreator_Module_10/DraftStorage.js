export const saveDraft = (draft) => {
  localStorage.setItem('eventDraft', JSON.stringify(draft));
};

export const loadDraft = () => {
  const saved = localStorage.getItem('eventDraft');
  return saved ? JSON.parse(saved) : null;
};