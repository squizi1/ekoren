document.addEventListener('DOMContentLoaded', () => {
  // Скрипт для переключения между комнатами
  const tabs = document.querySelectorAll('.cleaning-tab');
  const contents = document.querySelectorAll('.room-content');

  tabs.forEach(tab => {
      tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          contents.forEach(c => c.classList.remove('active'));

          tab.classList.add('active');
          const roomId = tab.getAttribute('data-room');
          document.getElementById(roomId).classList.add('active');
      });
  });

  // Модальное окно изображений
  window.openModal = function(imageSrc) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const caption = document.getElementById('modal-caption');
  
    const imgElement = [...document.querySelectorAll('img')].find(img => img.src.includes(imageSrc));
    const altText = imgElement ? imgElement.alt : '';
  
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    caption.textContent = altText;
  }
  

  window.closeModal = function() {
      const modal = document.getElementById('modal');
      modal.style.display = 'none';
  }

  window.onclick = function(event) {
      const modal = document.getElementById('modal');
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  }

  // Чат
  const chatModal = document.getElementById('chat-modal');
  const openChatBtn = document.getElementById('open-chat');
  const closeModalBtn = document.querySelector('.close-modal');

  function openChatModal() {
    chatModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const message = 'Hei! Jeg heter Olena og jeg er grunnleggeren av rengjøringsselskapet Ekoren. Hvordan kan jeg hjelpe deg?';
    const messageEl = document.getElementById('initial-message');
    messageEl.innerHTML = '';
    let index = 0;

    const typing = setInterval(() => {
      messageEl.innerHTML += message[index];
      index++;
      if (index === message.length) {
        clearInterval(typing);
        document.querySelector('.agent-status').textContent = 'в сети';
      }
    }, 30);
  }

  function closeChatModal() {
    chatModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openChatBtn && closeModalBtn) {
    openChatBtn.addEventListener('click', openChatModal);
    closeModalBtn.addEventListener('click', closeChatModal);
  }

  // Отправка формы
  const chatForm = document.getElementById('chat-form');
  if (chatForm) {
    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const message = this.querySelector('textarea').value.trim();

      if (message.length === 0) return;

      const botToken = '7360806214:AAFQA1uQlZzyCbQnnJYvcWPVphWDKqEbBTc';
      const chatId = '153733819';
      const text = `💬 Новое сообщение с сайта ekoren.no:\n\n"${message}"`;

      fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
        .then(res => {
          if (res.ok) {
            alert('Сообщение отправлено! Мы скоро ответим.');
            closeChatModal();
            this.reset();
          } else {
            alert('Ошибка при отправке. Попробуйте снова.');
          }
        })
        .catch(err => {
          console.error(err);
          alert('Ошибка сети.');
        });
    });
  }
  // button totop
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
  scrollToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
// === Отслеживание событий GA4 ===

// Bestill rengjøring (верх и hero)
document.querySelectorAll('.cta-button, .btn').forEach(button => {
  button.addEventListener('click', () => {
    gtag('event', 'bestill_rengjoring', {
      event_category: 'Kontakt',
      event_label: 'CTA-knapp'
    });
  });
});

// Chat-knapp
const chatBtn = document.getElementById('open-chat');
if (chatBtn) {
  chatBtn.addEventListener('click', () => {
    gtag('event', 'start_chat', {
      event_category: 'Kontakt',
      event_label: 'Chat med oss'
    });
  });
}

// E-post
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
  emailLink.addEventListener('click', () => {
    gtag('event', 'send_email', {
      event_category: 'Kontakt',
      event_label: 'E-postlink'
    });
  });
}

// Telefon
const phoneLink = document.querySelector('a[href^="tel:"]');
if (phoneLink) {
  phoneLink.addEventListener('click', () => {
    gtag('event', 'call_phone', {
      event_category: 'Kontakt',
      event_label: 'Telefonlink'
    });
  });
}


});
