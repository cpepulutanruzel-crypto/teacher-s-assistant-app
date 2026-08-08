const KEY = "sections";

export const getSections = () => {
  const sections = localStorage.getItem(KEY);
  return sections ? JSON.parse(sections) : [];
};

export const saveSections = (section) => {
  const sections = getSections();
  sections.push({ id: Date.now(), ...section });
  localStorage.setItem(KEY, JSON.stringify(sections));
  return sections;
};

export const removeSection = (id) => {
  const sections = getSections();
  const updatedSections = sections.filter((section) => section.id !== id);
  localStorage.setItem(KEY, JSON.stringify(updatedSections));
};

export const addStudentToSection = (sectionId, student) => {
  const sections = getSections();
  const section = sections.find((section) => section.id === sectionId);
  if (!section) {
    return null;
  }
  section.sectionStudent.push({
    id: Date.now(),
    ...student,
  });
  localStorage.setItem(KEY, JSON.stringify(sections));

  return sections;
};
