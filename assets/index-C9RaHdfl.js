import{b as h,b$ as j,r as o,c0 as y,j as e,F as g,P as S,S as k,d as l,B as P}from"./index-Du8Lk3Q-.js";import{C as p}from"./index-BGqEl4Tt.js";import{u as D}from"./useGetErrors-Bhs_yQR9.js";import{c as T,d as C,a as s}from"./index.esm-DPFBS4_k.js";import"./index-yPg3TB0L.js";T().shape({id:C().required("Id is required"),title_en:s().required("Title is required"),title_np:s().required("Title is required"),description_en:s().required("Description is required"),description_np:s().required("Description is required")});const U=()=>{const u="privacy-policy-section",m={id:"",title_en:"",title_np:"",description_en:"",description_np:""},{control:t,handleSubmit:f,reset:b,formState:F}=h({defaultValues:m}),{data:i}=j(u),[r,n]=o.useState({}),{mutateAsync:x,isPending:_,isError:a,error:c}=y();o.useEffect(()=>{i&&b(i==null?void 0:i.data)},[i]),o.useEffect(()=>{a&&n(D(c))},[a,c]);const E=async d=>{n({});const{id:q,...$}=d;(await x({id:q,data:d})).status===400&&n({})};return e.jsxs(g,{flexDir:"column",gap:4,children:[e.jsx(S,{heading:"Policy and Conditions",description:"Manage the policy and conditions of the website"}),e.jsx(k,{alignItems:"start",columns:{base:1,md:2},gap:4,asChild:!0,children:e.jsxs("form",{noValidate:!0,id:"section-form-policy-conditions",onSubmit:f(E),children:[e.jsx(l,{control:t,name:"title_en",label:"Title (En)",required:!0,backendError:r.title_en}),e.jsx(l,{control:t,name:"title_en",label:"Title (Np)",required:!0,backendError:r.title_en}),e.jsx(p,{control:t,name:"description_en",label:"Description (En)",backendError:r.description_en}),e.jsx(p,{control:t,name:"description_np",label:"Description (Np)",backendError:r.description_np})]})}),e.jsx(P,{loading:_,type:"submit",form:"section-form-policy-conditions",children:"Save"})]})};export{U as default};