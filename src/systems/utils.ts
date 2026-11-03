export function yoyo(f: any) {
	return (t : any) => {
		if (t < 0.5) {
			return f(2 * t);
		}
		else {
			return 1 - f(2 * (t - 0.5));
		}
	}
}
