
<script>

import status from './status.vue'

import diagram from './equipmentCabinet/cDiagram.vue'
import equiIndex from './equipmentCabinet/index.vue'

import InstabusEIB from './InstabusEIB/index.vue'
import link from './navigation/link.vue'
import firebug from './firebug.vue'

import machineRoom from './machineRoom/index.vue'
import equipmentCabinet from './equipmentCabinet/cDiagram.vue'
import portfigure from './equipmentCabinet/portfigure.vue'
import search from './search.vue'
export default {
	getComp () {
		
		return {
			status,
			diagram,
			equiIndex,
			InstabusEIB,
			machineRoom,
			equipmentCabinet,
			portfigure,
			link,
			search,


			firebug

		}
	}
}
</script>