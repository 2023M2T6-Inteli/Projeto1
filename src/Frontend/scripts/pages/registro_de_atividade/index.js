document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.content-container');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const activityName = form.querySelector('input[type="text"]').value;
    const activityDescription = form.querySelector('textarea').value;
    const skillId = form.querySelector('select').value;
    const teacherId = localStorage.getItem('teacherID');

    const postData = {
      activity_name: activityName,
      activity_description: activityDescription,
      skill_id: skillId,
      teacher_id: teacherId
    };

    try {
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (response.status = 201) {
        alert('Atividade criada com sucesso!');
        form.reset();
      } else {
        alert('Ocorreu um erro ao criar a atividade.');
      }
    } catch (error) {
      alert(`Ocorreu um erro: ${error}`);
    }
  });
});
