import "./LandingPage.css"
import PosterBlock from "../components/PosterBlock"
import LatestBlock from "../components/LatestBlock"
import AnimatedBlock from "../components/AnimatedBlock"

function LandingPage() {
  return (
    <>
      <div class="landing-bg"></div>
      <LatestBlock/>
      <PosterBlock/>
      <AnimatedBlock/>
    </>
  )
}

export default LandingPage