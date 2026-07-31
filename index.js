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
//let global_path = "src/home.html";
let global_path = "data/articles/30072026-0.html";
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
	const xml_fetched = (await (await fetch(locale_dir + "locale.xml")).text()).toString();
	const xml_doc = $.parseXML(xml_fetched);

	$(xml_doc).children().children().each(function(){
		const id_name = $(this).prop("nodeName");				
		$(document.getElementById(id_name)).text($(this).text());
	})
}
async function loadContent()
{
	$("#content").load(global_path);
	await loadLocale();
}
async function setContentPath(path)
{
	global_path = path;
	await loadContent();
}