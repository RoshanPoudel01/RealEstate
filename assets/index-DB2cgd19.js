import{e as g,c4 as S,r as o,c5 as T,j as e,h as k,F as C,P as D,S as F,i as c,B as y}from"./index-Dql9ZPjC.js";import{C as u}from"./index--VI__M65.js";import{u as B}from"./useGetErrors-Bhs_yQR9.js";import{c as I,d as P,a as s}from"./index.esm-aNuxfPhz.js";import"./index-BupwMUFt.js";I().shape({id:P().required("Id is required"),title_en:s().required("Title is required"),title_np:s().required("Title is required"),description_en:s().required("Description is required"),description_np:s().required("Description is required")});const U=()=>{const p="terms-conditions-section",l={id:"",title_en:"",title_np:"",description_en:"",description_np:""},{control:r,handleSubmit:m,reset:f}=g({defaultValues:l}),{data:t,isLoading:x}=S(p),[i,n]=o.useState({}),{mutateAsync:_,isPending:b,isError:a,error:d}=T();o.useEffect(()=>{t&&f(t==null?void 0:t.data)},[t]),o.useEffect(()=>{a&&n(B(d))},[a,d]);const E=async h=>{n({});const{id:j,...q}=h;(await _({id:j,data:q})).status===400&&n({})};return x?e.jsx(k,{}):e.jsxs(C,{flexDir:"column",gap:4,children:[e.jsx(D,{heading:"Terms and Conditions",description:"Manage the terms and conditions of the website"}),e.jsx(F,{alignItems:"start",columns:{base:1,md:2},gap:4,asChild:!0,children:e.jsxs("form",{noValidate:!0,id:"section-form-terms-conditions",onSubmit:m(E),children:[e.jsx(c,{control:r,name:"title_en",label:"Title (En)",required:!0,backendError:i.title_en}),e.jsx(c,{control:r,name:"title_en",label:"Title (Np)",required:!0,backendError:i.title_en}),e.jsx(u,{control:r,name:"description_en",label:"Description (En)",backendError:i.description_en}),e.jsx(u,{control:r,name:"description_np",label:"Description (Np)",backendError:i.description_np})]})}),e.jsx(y,{loading:b,type:"submit",form:"section-form-terms-conditions",children:"Save"})]})};export{U as default};