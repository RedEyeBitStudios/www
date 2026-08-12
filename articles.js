async function fetchAndInsertArticles()
{
	const max_articles_limit = 8;
	
	let ids = [];
	let titles = [];
	const locale_placeholder = await async function()
	{
		const xml_fetched = (await (await fetch(locale_dir + "locale.xml")).text()).toString();
		const xml_doc = $.parseXML(xml_fetched);
		const articles = $(xml_doc).children();
		return $(articles.find("home\\:ARTICLE_ENTER")).text().toString();
	}();

	// Load ids and titles.
	{
		const xml_fetched = (await (await fetch(locale_dir + "home-articles.xml")).text()).toString();
		const xml_doc = $.parseXML(xml_fetched);
		const articles = $(xml_doc).children().children();

		const articles_count = Math.min(articles.length, max_articles_limit);

		for (let i = 0; i < articles_count; i++)
		{
			const entry = $(articles[i]);
			ids.push(entry.attr("id").toString());
			titles.push(entry.text().toString());
		}
	}

	// Make entries.
	let news = $("#home\\:NEWS");

	for (let i = 0; i < ids.length; i++)
	{
		let base = document.createElement("div");
		base.className = "entry";
		$(base).on("click", () => {
			setContentPath("data/articles/" + ids[i] + ".html")
		});

		let date = document.createElement("div");
		date.className = "entry-date";
		const date_str = ids[i][0] + ids[i][1] + "/" + ids[i][2] + ids[i][3] + "/" + ids[i][4] + ids[i][5] + ids[i][6] + ids[i][7];
		$(date).text(date_str);

		let title = document.createElement("div");
		title.className = "entry-title";
		$(title).text(titles[i]);

		let check = document.createElement("div");
		check.className = "entry-check";
		$(check).text(locale_placeholder);

		base.append(date);
		base.append(title);
		base.append(check);

		news.append(base);
	}
}


