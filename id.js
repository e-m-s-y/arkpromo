/**
 * Class Id
 */
class Id
{
	generate() {
		return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	}
}

/**
 * @type {Id}
 */
module.exports = new Id();