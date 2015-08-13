var _ = require('lodash');

function glob2re(pattern) {
	var re = '';
	var len = pattern.length;
	for (var i = 0; i < len; ++i) {
		var ch = pattern[i];
		switch (ch) {
			case '*':
				re += '.*';
				break;
			case '?':
				re += '.';
				break;
			case '[':
				var j = i + 1;
				if (j < len && pattern[j] === '!') ++j;
				if (j < len && pattern[j] === ']') ++j;
				while (j < len && pattern[j] !== ']') ++j;
				if (j >= len) {
					re += '\\[';
				} else {
					var contents = pattern.slice(i + 1, j);
					contents = contents.replace('\\', '\\\\');
					i = j + 1;
					if (contents[0] === '!')
						contents = '^' + contents.slice(1);
					else if (contents[0] === '^')
						contents = '\\' + contents;
					re += '[' + contents + ']';
				}
				break;
			default:
				re += _.escapeRegExp(ch);
		}
	}
	return new RegExp('^' + re + '$');
}

module.exports = glob2re;
