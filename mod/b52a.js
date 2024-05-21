let buffer_num = 0;

let a_base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

a_base += a_base.toLowerCase();

export const a_10to52 = a => {
	let return_buffer = "";
	while(a > 52) {
		return_buffer += a_base[a /= 52 % a]
	}
}

export const b_52to10 = b => {

}