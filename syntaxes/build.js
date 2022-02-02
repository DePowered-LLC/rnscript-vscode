const { writeFileSync } = require('fs');

const ENTITY_NAME = '[A-Za-z_][A-Za-z0-9_]*';
function steppedRegExp (base, stairs, roof) {
	let result = base;

	for (const stair of stairs) result += '(?:(' + stair + ')';
	result += ')?'.repeat(stairs.length);

	if (roof) result += roof;
	return result;
}

const rnscript = {
	scopeName: "source.rnscript",
	patterns: [
		{
			name: "entity.variable_declaration",
			match: steppedRegExp('(let)(?:', ['<', ENTITY_NAME, ':|->', ENTITY_NAME], '(>))?\\s+'),
			captures: {
				"1": { name: "keyword.variable.let" },
				"2": { name: "punctuation.type_params.open" },
				"3": { name: "entity.name.type.namespace" },
				"4": { name: "punctuation.separator.type_access" },
				"5": { name: "support.type" },
				"6": { name: "punctuation.type_params.close" }
			}
		},
		{
			name: "keyword.variable.let",
			match: "let"
		},
		{
			name: "keyword.other.this",
			match: "this"
		},
		{ include: "source.lua" }
	],
	repository: {
	}
};

writeFileSync(__dirname + '/rnscript.tmLanguage.json', JSON.stringify(rnscript, null, '\t'));
