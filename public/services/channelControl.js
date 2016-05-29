import wschannel from './wschannel.js'
import Config from './config'
import EventBus from './event-bus.js'

export default {
	setChannel (data) {
		var channel = new wschannel(services.channelurl);
		var eventBus = new EventBus(channel);
		channel.longPolling();
		Config.Runtime.eventBus = eventBus;
	}
}