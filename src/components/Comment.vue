<script>
import formatDate from "../includes/formatDate"
export default {
    created(){
        this.formatDate = formatDate.formatDate;
    },
    props: {
        comment: Object
    },
    data: () => ({
        
    }),
}
</script>
<template>
    <div style="display: flex;justify-content: space-between;align-items: center;">
        <strong style="color:ivory ;">{{comment.pseudo}}</strong>
        <p style="font-size: 12px;">le {{formatDate(comment.dt)}}</p>
    </div>
    <p style="margin-top: 0.5em;margin-bottom: 0.5em;">{{comment.contenu}}</p>
</template>