import{a6 as f,bf as j,bg as b,bh as p,bi as $,bj as T,bk as m,bl as w,bm as y,r as d,bn as A,j as o,bo as P,bp as R,bq as k,br as v,al as B,am as u,B as D}from"./index-iYgY3VGR.js";import{I as h}from"./Trash-Q03gug3t.js";const{withRootProvider:x,withContext:e,useStyles:to,PropsProvider:ro}=f({key:"dialog"});x(j,{defaultProps:{unmountOnExit:!0,lazyMount:!0}});const z=x(b,{defaultProps:{unmountOnExit:!0,lazyMount:!0}}),E=e(p,"trigger",{forwardAsChild:!0}),O=e($,"positioner",{forwardAsChild:!0}),S=e(T,"content",{forwardAsChild:!0}),I=e(m,"description",{forwardAsChild:!0}),M=e(w,"title",{forwardAsChild:!0}),F=e(y,"closeTrigger",{forwardAsChild:!0}),H=d.forwardRef(function(t,r){const i=A();return o.jsx(P.button,{...t,ref:r,onClick:()=>i.setOpen(!1)})}),q=e(R,"backdrop",{forwardAsChild:!0}),G=e("div","body"),J=e("div","footer"),K=e("div","header"),L=d.forwardRef(function(t,r){const{children:i,portalled:a=!0,portalRef:l,backdrop:n=!0,...c}=t;return o.jsxs(k,{disabled:!a,container:l,children:[n&&o.jsx(q,{}),o.jsx(O,{children:o.jsx(S,{ref:r,...c,asChild:!1,children:i})})]})}),N=d.forwardRef(function(t,r){return o.jsx(F,{position:"absolute",top:"2",insetEnd:"2",...t,asChild:!0,children:o.jsx(v,{size:"sm",ref:r,children:t.children})})}),Q=z,U=J,V=K,W=G,X=M,Y=I,Z=E,_=H,io=({onConfirm:s,heading:t,description:r,deleteText:i,isDeleteLoading:a,cancelText:l,trigger:n,open:c,setOpen:g})=>o.jsxs(Q,{role:"alertdialog",open:c,onOpenChange:C=>g(C.open),onInteractOutside:()=>g(!1),lazyMount:!0,unmountOnExit:!0,children:[o.jsx(Z,{asChild:!0,children:n??o.jsx(B,{size:"sm",variant:"subtle",colorPalette:"red","aria-label":"Delete",children:o.jsx(u,{asChild:!0,boxSize:6,borderRadius:5,children:o.jsx(h,{})})})}),o.jsxs(L,{children:[o.jsx(V,{children:o.jsx(X,{children:t??"Are you sure?"})}),o.jsx(W,{children:o.jsx(Y,{children:r??"Are you sure you want to delete this item? This cannot be undone."})}),o.jsxs(U,{children:[o.jsx(_,{asChild:!0,children:o.jsx(D,{colorPalette:"gray",variant:"outline",children:l??"Cancel"})}),o.jsxs(D,{colorPalette:"red",loading:a,onClick:s,children:[o.jsx(u,{asChild:!0,boxSize:5,children:o.jsx(h,{})}),i??"Delete"]})]}),o.jsx(N,{})]})]});export{io as D,Q as a,Z as b,L as c,V as d,X as e,W as f,U as g,_ as h,N as i};