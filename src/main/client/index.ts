import "reflect-metadata";
import { bindService, unloadGlobalContainer } from "../../common/global";
import { ChainMiddlewareEventClientFactory } from "../../common/middleware/Events/event.client.middleware";
import { ChainMiddlewareTickClientFactory } from "../../common/middleware/Tick/middleware.tick.client";
import { Application } from "../../common/app";
import { ClientProviderLoader } from "../../common/loader/Provider/provider.client.loader";

async function Bootstrap() {
	try {
		await bindService<ChainMiddlewareEventClientFactory>(
			"MiddlewareFactory",
			ChainMiddlewareEventClientFactory
		);
		await bindService<ChainMiddlewareTickClientFactory>(
			"MiddlewareTickFactory",
			ChainMiddlewareTickClientFactory
		);

		const application = await Application.create(ClientProviderLoader, [], {
			gracefulShutdownTimeout: 30000,
			enableResourceListener: true,
		});

		console.log("Application läuft... Warte auf Shutdown-Signal");
		await application.waitForShutdown();
	} catch (error) {
		const err = error instanceof Error ? error : new Error(String(error));
		console.error("We got an error: ", err);
	} finally {
		unloadGlobalContainer();
	}
}

Bootstrap();
