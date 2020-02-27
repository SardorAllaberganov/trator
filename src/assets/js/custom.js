module.exports = {
    created: function(){
        this.dropdownToggle();
        this.sidebarToggle();
    },
    methods: {
        dropdownToggle: function(){
            document.getElementById('dropdown').style.display = document.getElementById('dropdown').style.display === 'none' ? 'block' : 'none'
        },
        sidebarToggle: function(){
            document.getElementById('sidebar').classList.toggle('toggle-sidebar')
        }
    }
}
