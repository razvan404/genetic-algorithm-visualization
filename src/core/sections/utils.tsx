export function scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.warn(`Section with ID ${sectionId} not found.`);
    }
}

export function nextSection(section: string) {
    return (
        <>
            &gt; Next section: <strong>{section}</strong>
        </>
    );
}

export function nextChapter(chapterTitle: string) {
    return (
        <>
            &gt; Next chapter: <strong>{chapterTitle}</strong>
        </>
    );
}
