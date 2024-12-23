import{b as g,b$ as S,r as o,c0 as D,j as e,F as k,P,S as T,d,B as C}from"./index-BVyWgP0Q.js";import{C as l}from"./index-B6yB1ue0.js";import{u as F}from"./useGetDirtyData-Dc4_-Xhu.js";import{u as $}from"./useGetErrors-Bhs_yQR9.js";import{c as v,d as B,a as s}from"./index.esm-DXGjF0Z-.js";import"./index-jbnGfxiJ.js";v().shape({id:B().required("Id is required"),title_en:s().required("Title is required"),title_np:s().required("Title is required"),description_en:s().required("Description is required"),description_np:s().required("Description is required")});const H=()=>{const p="privacy-policy-section",u={id:"",title_en:"",title_np:"",description_en:"",description_np:""},{control:i,handleSubmit:m,reset:f,formState:b}=g({defaultValues:u}),{data:t}=S(p),[r,n]=o.useState({}),{mutateAsync:x,isPending:_,isError:a,error:c}=D();o.useEffect(()=>{t&&f(t==null?void 0:t.data)},[t]),o.useEffect(()=>{a&&n($(c))},[a,c]);const E=async y=>{n({});const{id:q,...h}=y,j=F(b,h);(await x({id:q,data:j})).status===400&&n({})};return e.jsxs(k,{flexDir:"column",gap:4,children:[e.jsx(P,{heading:"Policy and Conditions",description:"Manage the policy and conditions of the website"}),e.jsx(T,{alignItems:"start",columns:{base:1,md:2},gap:4,asChild:!0,children:e.jsxs("form",{noValidate:!0,id:"section-form-policy-conditions",onSubmit:m(E),children:[e.jsx(d,{control:i,name:"title_en",label:"Title (En)",required:!0,backendError:r.title_en}),e.jsx(d,{control:i,name:"title_en",label:"Title (Np)",required:!0,backendError:r.title_en}),e.jsx(l,{control:i,name:"description_en",label:"Description (En)",backendError:r.description_en}),e.jsx(l,{control:i,name:"description_np",label:"Description (Np)",backendError:r.description_np})]})}),e.jsx(C,{loading:_,type:"submit",form:"section-form-policy-conditions",children:"Save"})]})};export{H as default};
