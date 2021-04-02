const calculateTotal = (array: number[]): number => array.reduce((sum, n) => (
	sum + n
), 0);

export default calculateTotal;
