import { useState } from 'react'
import Orphans from '../components/sponsored/orphans'
import Tabs from '../components/sponsored/tabs'
import Families from '../components/sponsored/families'

function Sponsored() {
  const [tab, setTab] = useState('')
  const isOrphans = tab == 'orphans'
  const isFamilies = tab == 'families'
  return (
    <div>
      <Tabs {...{ tab, setTab }} />
      {isOrphans && <Orphans />}
      {isFamilies && <Families />}
    </div>
  )
}

export default Sponsored
