import aws, { ConfigurationOptions } from "aws-sdk";

const awsConfig: ConfigurationOptions = {
	region: "eu-central-1",
	/** AmazonDynamoDBReadOnlyAccess */
	accessKeyId: "AKIA4DJYMLGYPIZ7FDMR",
	secretAccessKey: "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",
};

aws.config.update(awsConfig);

export const dbClient = new aws.DynamoDB.DocumentClient();
