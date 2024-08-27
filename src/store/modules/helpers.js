export function isMatchFilter(game, filter) {
	if (filter.name) {
		if (!game.name.toLowerCase().includes(filter.name.toLowerCase()) && !game.category.toLowerCase().includes(filter.name.toLowerCase())) return false
	}
	return true
}

export function getFiltersList(list, key) {
	return [...new Set(list.map((item) => item[key]))].sort();
}