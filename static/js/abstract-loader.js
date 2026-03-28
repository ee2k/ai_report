document.addEventListener('DOMContentLoaded', function() {
    const postItems = document.querySelectorAll('.post-item');

    postItems.forEach(postItem => {
        const sourceMd = postItem.dataset.sourceMd;
        const titleElement = postItem.querySelector('.title-placeholder');
        const dateElement = postItem.querySelector('.date-placeholder');
        const abstractElement = postItem.querySelector('.abstract-placeholder');

        if (sourceMd) {
            fetch(sourceMd)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(text => {
                    let title = '';
                    let date = '';
                    let abstract = '';
                    let content = text;

                    // Attempt to parse YAML front matter
                    const frontMatterMatch = text.match(/^---\n([\s\S]*?)\n---/);
                    if (frontMatterMatch) {
                        const frontMatter = frontMatterMatch[1];
                        const titleMatch = frontMatter.match(/title:\s*"(.*?)"/);
                        const dateMatch = frontMatter.match(/date:\s*"(.*?)"/);

                        if (titleMatch && titleMatch[1]) {
                            title = titleMatch[1];
                        }
                        if (dateMatch && dateMatch[1]) {
                            date = dateMatch[1];
                        }
                        const abstractMatch = frontMatter.match(/abstract:\s*"(.*?)"/);
                        if (abstractMatch && abstractMatch[1]) {
                            abstract = abstractMatch[1];
                        }
                    }

                    if (titleElement) {
                        titleElement.textContent = title;
                    }
                    if (dateElement) {
                        dateElement.textContent = date;
                    }
                    if (abstractElement) {
                        abstractElement.textContent = abstract;
                    }
                })
                .catch(error => {
                    console.error(`Error fetching or parsing markdown for ${sourceMd}:`, error);
                    if (abstractElement) {
                        abstractElement.textContent = 'Could not load summary.';
                    }
                });
        }
    });
});