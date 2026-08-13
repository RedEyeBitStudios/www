function loadXMLData()
{
	const xml_fetched = $("#enum_info").text();
	const xml_doc = $.parseXML(xml_fetched);

	const root = xml_doc.firstElementChild;
	$("#main_title").text($(root).attr("title"));
	$("#desc").text($(root).attr("desc"));
	const children_nodes = root.children;
	$(children_nodes).each(
		function()
		{
			let entry_root = $("<div>", { class: "value_container" });
			const entry_provided = $("<div>", { class: "value_entry-provided", text: "Provided by v" + $(this).attr("v") });
			const entry_name = $("<div>", { class: "value_entry", text: $(this).attr("name") });
			const entry_desc = $("<div>", { class: "value_entry-desc", text: $(this).text() });

			$(entry_root).append(entry_provided);
			$(entry_root).append(entry_name);
			$(entry_root).append(entry_desc);

			$("#values_list").append(entry_root);
		}
	);
}


fetch("templates/enumeration.html").then(
	function(response)
	{
		response.text().then(
			function(response)
			{
				$("#content").append(response);
				loadXMLData();
			}
		)
	}
);
