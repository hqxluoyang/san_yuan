
<script>

import status from './status.vue'

import diagram from './equipmentCabinet/cDiagram.vue'
import equiIndex from './equipmentCabinet/index.vue'

import InstabusEIB from './InstabusEIB/index.vue'

import diagram from './machineRoom/index.vue'
import diagram from './equipmentCabinet/cDiagram.vue'
export default {
	getComp () {
		
		return {
			status,
			diagram,
			equiIndex,
			InstabusEIB

		}
	}
}
</script>