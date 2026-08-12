const locale_dir = function()
{
	const locale = navigator.language;

	if (locale.includes("pl"))
	{
		return "locales/pl-PL/";
	}
	else
	{
		return "locales/en-US/"
	}
}();
{
	const message = locale_dir.includes("pl") ? "Niewspierana przeglądarka. Strona może nie zachowywać się poprawnie." : "Unsupported browser. Page may not behave properly.";
	const ua = navigator.userAgent;
	if (ua.includes("OPRGX") || ua.includes("Opera"))
	{
		alert(message);
	}
}

async function loadLocale()
{
	const response = await fetch(locale_dir + "locale.xml");
	if (response.status == 200 && response.ok)
	{
		const xml_fetched = (await response.text()).toString();
		
		const xml_doc = $.parseXML(xml_fetched);

		$(xml_doc).children().children().each(function(){
			const id_name = $(this).prop("nodeName");
			$(document.getElementById(id_name)).text($(this).text());
		})
	}
	else
	{
		loadLocale();
	}
}
async function loadContent(path)
{
	$("#content").load(path,
		function()
		{
			loadLocale()
		}
	);
}
async function setContentPath(path)
{
	await loadContent(path);
}