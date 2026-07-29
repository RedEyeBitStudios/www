const locale_url = function()
{
	const locale = navigator.language;
	
	if (locale != "pl-PL")
	{
		return "locales/en-US.xml"
	}
	else
	{
		return "locales/" + locale + ".xml";
	}
}();
let global_path = "src/home.html";

function loadLocale()
{
	$.get(locale_url, function(locale_doc)
	{
		$(locale_doc).children().children().each(function(){
			const id_name = $(this).prop("nodeName");

			$(document.getElementById(id_name)).text($(this).text());
		});
	});
}

function setContentPath(path)
{
	global_path = path;
	loadContent();
}
function loadContent()
{
	$("#content").load(global_path);
	loadLocale();
}