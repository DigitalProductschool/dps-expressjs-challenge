// ./src/models/reportModel.ts, model and validator for the report schema.

export interface Report {
	id: string;
	text: string;
	projectId: string;
}
