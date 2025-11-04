import { Text } from "@medusajs/ui"


import Insider from "../../../common/icons/insider"

const MedusaCTA = () => {
  return (
    <Text className="flex gap-x-2 txt-compact-small-plus items-center">
      Powered by
      <a href="https://www.diginsider.net" target="_blank" rel="noreferrer">
        <Insider fill="#9ca3af" className="fill-[#9ca3af]" />
      </a>
 
    </Text>
  )
}

export default MedusaCTA
