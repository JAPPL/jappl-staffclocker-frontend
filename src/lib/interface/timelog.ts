export interface TimeLog {
	id: number;
	timestamp: string;
	message: string;
	projectId: number;
	hourSpent: number;
	approved: boolean;
	paid: boolean;
}
