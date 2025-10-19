/**
 * Person Tooltip Utility
 * Initializes Tippy.js tooltips on elements with the 'person' attribute
 * to display the person's name on hover.
 */

import tippy, { type Instance } from 'tippy.js';

/**
 * Initialize tooltips on all elements with a 'person' attribute
 * The tooltip will display the value of the person attribute on hover
 * @returns Array of Tippy instances created
 */
export const initPersonTooltips = (): Instance[] => {
  const instances: Instance[] = [];

  // Use a small delay to ensure DOM is fully ready
  // This is especially important when elements are inside Swiper slides
  setTimeout(() => {
    // Find all elements with the 'person' attribute
    // Exclude cloned slides created by Swiper (they have .swiper-slide-duplicate class)
    const elementsWithPerson = document.querySelectorAll(
      '[person]:not(.swiper-slide-duplicate [person])'
    );

    if (elementsWithPerson.length === 0) {
      // eslint-disable-next-line no-console
      console.warn('No elements with person attribute found');
      return;
    }

    // Initialize Tippy.js on each element
    elementsWithPerson.forEach((element) => {
      const personName = element.getAttribute('person');
      const description = element.getAttribute('description');

      if (personName) {
        try {
          // Create tooltip content with name and description below
          const tooltipContent = document.createElement('div');
          tooltipContent.className = 'person-tooltip-content';

          const nameElement = document.createElement('div');
          nameElement.className = 'person-tooltip-name';
          nameElement.textContent = personName;

          const companyElement = document.createElement('div');
          companyElement.className = 'person-tooltip-company';
          companyElement.textContent = description || 'Reino Capital - Participante';

          tooltipContent.appendChild(nameElement);
          tooltipContent.appendChild(companyElement);

          const instance = tippy(element as Element, {
            content: tooltipContent,
            placement: 'top',
            animation: 'fade',
            arrow: false,
            theme: 'person',
            trigger: 'mouseenter focus',
            hideOnClick: false,
            // Ensure tooltip appears above Swiper elements
            zIndex: 9999,
            // Add some offset for better visibility
            offset: [0, 10],
            // Append to body to avoid z-index issues with Swiper
            appendTo: () => document.body,
            // Allow HTML content
            allowHTML: true,
          });

          if (instance) {
            instances.push(instance);
          }
        } catch (error) {
          console.error(`Failed to initialize tooltip for element:`, element, error);
        }
      }
    });

    // eslint-disable-next-line no-console
    console.log(
      `✓ Initialized ${instances.length} person tooltips on ${elementsWithPerson.length} elements`
    );
  }, 100);

  return instances;
};
