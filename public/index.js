$(document).ready(() => {
  $.get("/list-templates?MaxItems=10", function (data) {
    const templatesArr = data.items.TemplatesMetadata;

    if (templatesArr.length === 0) {
      $('#noTemplatesPlaceholder').fadeIn();
      return; //no need to continue
    }

    //Build table
    let tableContent = ``;
    for (let template of templatesArr) {
      tableContent += `
          <tr>
            <td scope="row">${template.Name}</td>
            <td>${template.CreatedTimestamp}</td>
            <td>
            <a href="/update-template?name=${template.Name}" class="mr-2">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
              </svg>
            </a>
            
            <a href="javascript:;" onclick="triggerDeleteConfimationModal('${template.Name}')">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
              </svg>
            </a>
            </td>
          </tr>`;
    }

    $('#templateListTable tbody').append(tableContent);
    $('#templateListTable').show();
  });
});

function deleteTemplate(templateName) {
  //Upon modal confirmation, make the delete template API call
  $.ajax({
    url: `/delete-template/${templateName}`,
    type: 'DELETE',
    success: function(result) {
      // Do something with the result
      window.location.reload();
    }
  });
}

function triggerDeleteConfimationModal(templateName) {
  $('#deleteTemplateCta').attr('data-action-name', templateName);
  $('#deleteConfirmationModal').modal();
}