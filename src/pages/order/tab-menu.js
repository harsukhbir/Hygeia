export const tabs = [
	{
		"title": "Breast Pump",
		"id": "BreastPump",
	},
	{
		"title": "Pump Accessories",
		"id": "PumpAccessories",
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