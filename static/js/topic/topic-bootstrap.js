(() => {
    function loadScript(src, options = {}) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");

            script.src = src;

            if (options.defer) {
                script.defer = true;
            }

            script.onload = resolve;
            script.onerror = reject;

            document.head.appendChild(script);
        });
    }


    async function init() {
        const head = document.head;
        const body = document.body;


        // ---------- document settings ----------

        document.documentElement.lang = "en";

        const title = document.createElement("title");
        title.textContent = "Topic";
        head.appendChild(title);


        const viewport = document.createElement("meta");
        viewport.name = "viewport";
        viewport.content = "width=device-width, initial-scale=1.0";
        head.appendChild(viewport);


        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "/static/css/index.css";
        head.appendChild(css);


        // ---------- page DOM ----------

        const header = document.createElement("header");

        const headerContent = document.createElement("div");
        headerContent.className = "header-content";

        const logo = document.createElement("div");
        logo.className = "logo";

        const home = document.createElement("a");
        home.href = "../";
        home.textContent = "home";

        logo.appendChild(home);
        headerContent.appendChild(logo);
        header.appendChild(headerContent);

        body.appendChild(header);


        const main = document.createElement("main");

        const content = document.createElement("div");
        content.id = "content";
        content.className = "content";

        main.appendChild(content);
        body.appendChild(main);

        // ---------- common scripts ----------

        loadScript("/static/js/stats.js", { defer: true });

        await loadScript("/static/js/marked.min.js");
        await loadScript("/static/js/topic/topic-loader.js");

        if (window.loadContent && window.TOPIC_PATH) {
            await window.loadContent(window.TOPIC_PATH);
        }
    }

    document.addEventListener("DOMContentLoaded", init);

})();