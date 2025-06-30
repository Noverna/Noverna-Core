import { Once } from "../../../common/decorator/Events/Once";
import { OnEvent } from "../../../common/decorator/Events/OnEvent";
import { Provider } from "../../../common/decorator/Provider";
import { Interval, Tick } from "../../../common/decorator/Tick";
import { OnceSharedEvents } from "../../../common/events/Once";
import { EventsServer } from "../../../common/events/Server";

@Provider()
export class TestProvider {
	@Tick(Interval.EVERY_MINUTE, "test")
	public async test() {
		TriggerEvent("debug", "test");
	}

	@OnEvent(EventsServer.onResourceStart)
	public async onServerResourceStart(resourceName: string) {
		console.log("onServerResourceStart", resourceName);
	}

	@OnEvent(EventsServer.debug, { networked: false })
	public async onDebug(data: string) {
		// data is not there, event though its give above
		console.log("onDebug", data);
	}
}
