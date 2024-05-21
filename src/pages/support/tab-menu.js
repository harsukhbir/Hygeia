export const tabs = [
	{
		"title": "Tutorials",
		"id": "Tutorials",
		"width": 0
	},
	{
		"title": "Manuals",
		"id": "Manuals",
		"width": 0
	},
	{
		"title": "Articles",
		"id": "Articles",
		"width": 0
	},
	{
		"title": "Contact Us",
		"id": "Contact Us",
		"width": 0
	},
];

export function getInitialScrollOffset(initialTab) {
	let filteredData = tabs.filter(function(item) {
		return item.id.includes(initialTab);
	});
	return filteredData[0].width;
}

export function getActiveIndex(initialTab) {
	return tabs.findIndex((item) => item.id === initialTab);
}

export function getIndexData(index) {
	return tabs[index];
}

export default tabs;