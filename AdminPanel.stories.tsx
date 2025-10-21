export default {
  title: 'Admin/AdminPanel',
  component: AdminPanel,
};

export const Default = () => <AdminPanel onSave={(p) => alert(JSON.stringify(p))} />;