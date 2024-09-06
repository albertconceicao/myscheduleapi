declare module 'swagger-combine' {
	const swaggerCombine: (config: string | object) => Promise<any>;
	export default swaggerCombine;
}
