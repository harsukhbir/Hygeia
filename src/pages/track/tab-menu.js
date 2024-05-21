export const tabs = [
	{
		"title": "Breastfeed",
		"id": "Breastfeed",
	},
	{
		"title": "Pump",
		"id": "Pump",
	},
	{
		"title": "Bottles",
		"id": "Bottles",
	},
	{
		"title": "Diapers",
		"id": "Diapers",
	},
	{
		"title": "Growth",
		"id": "Growth",
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