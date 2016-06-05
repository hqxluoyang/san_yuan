/*
    hqx
    2016/1231
*/
import eventBus from './eventBus'
import chRouterSucc from './chRouterSucc.js'
import allComp from './allComp.js'
import Config from './config.js'


export default {
   
    start (data) {
        Config.eventBus = Config.Runtime.eventBus = new eventBus();
        allComp.startInit();
        chRouterSucc.init();
    }

}