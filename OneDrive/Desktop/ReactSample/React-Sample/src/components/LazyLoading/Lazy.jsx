const { lazy } = require("react");




const LazyComponent = lazy(()=>{
    import ('./components/LazyComponent')
})

export default LazyComponent